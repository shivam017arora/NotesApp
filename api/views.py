from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from . import models
from . import serializers

# Create your views here.


@api_view(['GET'])
def getRoutes(request):
    routes = [
        {
            'Endpoint': '/notes/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of notes'
        },
        {
            'Endpoint': '/notes/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single note object'
        },
        {
            'Endpoint': '/notes/create/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/update/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/delete/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting note'
        },
    ]
    return Response(routes)


@api_view(['GET'])
def getNotes(request):
    notes = models.Note.objects.all().order_by('-updated')
    serializer = serializers.NoteSerializer(notes, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getNote(request, pk):
    note = models.Note.objects.get(id=pk)
    serializer = serializers.NoteSerializer(note, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
def updateNote(request, pk):
    note = models.Note.objects.get(id=pk)
    serializer = serializers.NoteSerializer(
        instance=note, data=request.data)  # update data of note
    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


@api_view(['POST'])
def createNote(request):
    data = request.data
    note = models.Note.objects.create(
        body=data['body']
    )
    serializer = serializers.NoteSerializer(note, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
def deleteNote(request, pk):
    note = models.Note.objects.get(id=pk)
    note.delete()
    return Response('Note was deleted!')
