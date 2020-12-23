<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student List</title>
</head>
<body>

    {{-- <a href="/home">Back</a>
    <a href="/logout">Logout</a> --}}

    <table border = "1">

        <tr>
            <td>Name</td>
            <td>Company Name</td>
            <td>Contact</td>
            <td>User Name</td>
        </tr>

        @for($i = 0; $i < count($user); $i++)
            <tr>
                <td>{{$user[$i]['name']}}</td>
                <td>{{$user[$i]['comName']}}</td>
                <td>{{$user[$i]['contact']}}</td>
                <td>{{$user[$i]['userName']}}</td>
                <td>
					<a href="/edit/{{$user[$i]['userName']}}">Edit </a> |
					<a href="/details/{{$user[$i]['userName']}}">Details </a> |
					<a href="/delete/{{$user[$i]['userName']}}">Delete </a> 
				</td>
            </tr>
        @endfor
    </table>

</body>
</html>