@extends('main')

@section('main')   
<body>

	<form method="post">
		{{-- <!-- @csrf --> --}}
		{{-- <!-- {{csrf_field()}} --> --}}
		<input type="hidden" name="_token" value="{{csrf_token()}}">
		<fieldset>
			<legend>Edit</legend>
		<table>
			<tr>
				<td>Name</td>
				<td><input type="text" name="name" value='{{old("name")}}'></td>
			</tr>
			<tr>
				<td>Company Name</td>
				<td><input type="text" name="comName" value='{{old("comName")}}'></td>
			</tr>
            <tr>
				<td>Contact</td>
				<td><input type="text" name="contact" value='{{old("contact")}}'></td>
			</tr>
			<tr>
				<td>User Name</td>
				<td><input type="text" name="userName" value='{{old("userName")}}'></td>
			</tr>
			
			<tr>
				<td>password</td>
				<td><input type="text" name="password"></td>
			</tr>
			<tr>
				<td><input type="submit" name="submit" value="Edit"></td>
			</tr>
		</table>
		</fieldset>
	</form>

</body>
@endsection