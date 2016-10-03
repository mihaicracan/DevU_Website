<!DOCTYPE html>
<html>
    <head>
        <title>Photo Studio | Login</title>

        <link href='https://fonts.googleapis.com/css?family=Lato:400,300,300italic,700,900' rel='stylesheet' type='text/css'>
        <link rel="stylesheet" href="../css/lib.css?v=1.0.0">
        <link rel="stylesheet" href="..{{ elixir('css/app.css') }}">
        <link rel="stylesheet" type="text/css" href="http://getbootstrap.com/examples/signin/signin.css">
    </head>
    <body>
        <div class="container">


            <form class="form-signin" method="POST" action="{{ url('auth/login') }}">
                {!! csrf_field() !!}

                <h2 class="form-signin-heading">Please sign in</h2>

                @if (count($errors) > 0)
                    <div class="alert alert-danger">
                        @foreach ($errors->all() as $error)
                            <p>{{ $error }}</p>
                        @endforeach
                    </div>
                @endif
                
                <label for="inputEmail" class="sr-only">Email address</label>
                <input type="email" name="email" id="inputEmail" class="form-control" placeholder="Email address" value="{{ old('email') }}" required autofocus>
                
                <label for="inputPassword" class="sr-only">Password</label>
                <input type="password" name="password" id="inputPassword" class="form-control" placeholder="Password" required>
                
                <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
            </form>

        </div>

        <script type="text/javascript" src="./js/lib.js?v=1.0.0"></script>
    </body>
</html>