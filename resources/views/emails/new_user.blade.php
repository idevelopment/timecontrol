<p>Dear,</p>
<br>
<p>Below you will find the access data for {{ $user->fname }} {{ $user->name }} to {{ url() }}:</p>
<p>Username: {{ $user->email }}</p>
<p>Password: {{ $password }}</p>

Treat this information confidential!

<p>Click here to go to the portal: <a href="{{ url('') }}">{{ url('') }}</a></p>

