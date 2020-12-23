<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src = "https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js">
    </script>
    <title>@yield('title')</title>
</head>

<body>

    <input type="text" class="form-control" placeholder="Search" name="bookname" id="search" onkeyup="searchBook(this)">

      <h1>lallaa</h1>
       @yield('main')
       <h1>jahsjas</h1>
    
</body>
</html>

<script>
    function getMessage() {
       $.ajax({
          type:'POST',
          url:'/getmsg',
          data:'_token = <?php echo csrf_token() ?>',
          success:function(data) {
             $("#msg").html(data.msg);
          }
       });
    }
 </script>

