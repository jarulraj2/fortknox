from django.shortcuts import render

def index(request):
    return render(request, 'cloudweb/home.html')


def product(request):
    return render(request, 'cloudweb/product.html')
