

def createNote(request):
    data = request.data
    note = models.Note.objects.create(
        body=data['body']
    )
    serializer = serializers.NoteSerializer(note, many=False)
    return Response(serializer.data)
