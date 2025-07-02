import os
from django import forms
from django.conf import settings
from .models import EditableCSS, EditableJS, EditableJSHistory
from rjsmin import jsmin  # Minifier for JavaScript

# ---------- Editable CSS Form ----------
class EditableCSSForm(forms.ModelForm):
    css_content = forms.CharField(
        widget=forms.Textarea(attrs={'rows': 30, 'cols': 120}),
        label="Edit CSS Content"
    )

    class Meta:
        model = EditableCSS
        fields = ['name', 'file_path', 'css_content']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        instance = kwargs.get('instance')
        if instance:
            full_path = os.path.join(settings.BASE_DIR, instance.file_path)
            try:
                with open(full_path, 'r', encoding='utf-8') as f:
                    css = f.read()
                    self.fields['css_content'].initial = css
            except FileNotFoundError:
                self.fields['css_content'].initial = '/* CSS file not found */'

    def save(self, commit=True):
        instance = super().save(commit=False)
        css_data = self.cleaned_data['css_content']
        full_path = os.path.join(settings.BASE_DIR, instance.file_path)

        # ✅ Write updated CSS to file
        with open(full_path, 'w', encoding='utf-8') as f:
            f.write(css_data)

        if commit:
            instance.save()
        return instance


# ---------- Editable JS Form ----------
class EditableJSForm(forms.ModelForm):
    js_content = forms.CharField(
        widget=forms.Textarea(attrs={'rows': 30, 'cols': 120, 'id': 'id_js_content'}),
        label="Edit JS Content"
    )

    class Meta:
        model = EditableJS
        fields = ['name', 'file_path', 'js_content']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        instance = kwargs.get('instance')
        if instance:
            full_path = os.path.join(settings.BASE_DIR, instance.file_path)
            try:
                with open(full_path, 'r', encoding='utf-8') as f:
                    js = f.read()
                    self.fields['js_content'].initial = js
            except FileNotFoundError:
                self.fields['js_content'].initial = '// JS file not found'

    def save(self, commit=True):
        instance = super().save(commit=False)
        js_data = self.cleaned_data['js_content']
        minified_js = jsmin(js_data)

        full_path = os.path.join(settings.BASE_DIR, instance.file_path)

        # ✅ Get previous JS content (for history)
        previous_content = ''
        if os.path.exists(full_path):
            with open(full_path, 'r', encoding='utf-8') as f:
                previous_content = f.read()

        # ✅ Save EditableJS instance first
        if commit:
            instance.save()

            # ✅ Write minified JS to file
            with open(full_path, 'w', encoding='utf-8') as f:
                f.write(minified_js)

            # ✅ Save to EditableJSHistory
            EditableJSHistory.objects.create(
                editable_js=instance,
                previous_content=previous_content,
                new_content=minified_js
            )

        return instance
