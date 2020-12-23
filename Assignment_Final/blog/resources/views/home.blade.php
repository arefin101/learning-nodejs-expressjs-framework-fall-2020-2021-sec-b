@extends('main')

@section('main')    
<body>
    <h1>{{$username}} vai Apni Home e Chole Ascen</h1>

    <a href="{{route('create')}}">Create New Employee</a>
    <a href="{{route('stdlist')}}">View Student List</a>
    {{-- <a href="/logout">Log Out</a> --}}

</body>
@endsection
