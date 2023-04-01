from django.template.response import TemplateResponse


def get_note_detail(request):
    return TemplateResponse(request, "homepage.html")
