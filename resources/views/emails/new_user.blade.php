<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta name="viewport" content="width=device-width" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	
<style type="text/css">
@import url(http://fonts.googleapis.com/css?family=Montserrat:400,700);

	body{
		background-color:#e5e9ec; 
        font-family: 'Montserrat', sans-serif; 
		color: #999;
		font-size: 12px;
		margin: 0;
	}	
	
	a	{
		color: #555;
		text-decoration: none;
	}
	
	a:hover	{
		color: #84ccc5;
	}
	
	.skin-font	{
		color: #84ccc5;
	}
	
	.bg-white	{
		background-color: #ffffff;
	}
	
	.bg-grey	{
		background-color: #fafafa;
	}
	
	.text-white	{
		color: #fff;
	}
	
	.text-skin	{
		color: #84ccc5;
	}
	
	.hover-white:hover	{
		color: #fff;
	}
	
	.email-btn	{
		background-color: #226FBC;
		border: 1px solid #eee;
		border-radius:4px; 
		background-clip: padding-box;
		font-size:13px; 
		text-align:center;  
		color:#000; 
		font-weight: 300; 
	}
	
	.email-btn.skin-color	{
		background-color: #226FBC;
	}
	
	.email-btn.skin-color:hover	{
		background-color: #226FBC;
	}
	
	.email-btn.skin-color .btn-inner	{
		color: #fff	;
	}
	
	.btn-inner	{
		display: block;
		padding: 7px 10px;
	}
	
</style>

</head>
 
<body>

<!-- Wrapper -->
<table width="100%" id="wrapper" border="0" cellspacing="0" cellpadding="0" bgcolor="#e5e9ec">  
	<tbody>
	
		<!-- section1 -->
		<tr>
			<td>	
				<table bgcolor="#226FBC" align="center" width="600" style="height:5px;">
					<tbody><tr><td></td></tr></tbody>
				</table>
			</td>	
		</tr>
		<!-- end section1 -->
		<!-- section2 -->
	<tr>
	 <td>	
	  <table bgcolor="#ffffff" align="center" width="600" style="border-bottom: 1px solid #eee; padding:15px 0;">
	   <tbody>
		<tr>
		 <td>
		  <table bgcolor="#ffffff" align="left" width="200">
			<tbody>
			<tr>
				<td width="300" align="left" valign="top">
				<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
			<tbody>
		<tr>
		<td  align="left" valign="middle" style="font:20px; color:#84CCC5; padding-left:6px;">
			<a href="#" style=" color:#226FBC;">Account information </a>
		</td>
		</tr>
		</tbody>
		</table>
		</td>
	</tr>
	</tbody>
 </table>

							</td>
						</tr>
					</tbody>
				</table>
			</td>	
		</tr>
		<!-- end section2 -->
		
		<!-- section3 -->
		<tr>
			<td>	
				<table bgcolor="#ffffff" align="center" width="600" style="border-spacing: 0;">
					<tbody>
						<tr style="height:15px;"><td></td></tr>
						<tr align="left" style="padding-top: 10px;">
					     <td style="font:13px Montserrat, sans-serif; padding:0 50px 20px;">
			<p>Dear {{ $user->name }} {{ $user->fname }},</p>
<br>
<p>Below you will find the access data to authenticate on <b>Time control</b>.</p>
<p>Treat this information confidential!</p>

<br>
<p>Link: <a href="{{ url() }}">{{ url() }}</a></p>
<p>Username: {{ $user->email }}</p>
<p>Password: {{ $password }}</p>
</td>
						</tr>
						<tr align="center" style="padding-top: 10px;" bgcolor="#ffffff">
							<td>
								<table border="0" align="center" cellpadding="0" cellspacing="0" bgcolor="#ffffff">
									<tbody>
										<tr>
											<td align="center" valign="middle" height="32" class="email-btn skin-color">
												<a href="#" class="btn-inner">
													Open time control
												</a>
											</td>

											<!-- Space -->
											<td valign="top">
												<table width="20" border="0" align="center" cellpadding="0" cellspacing="0">
													<tbody>
														<tr>
															<td valign="top">
																&nbsp;
															</td>
														</tr>
													</tbody>
												</table>
											</td>
										</tr>
									</tbody>
							   </table>
							</td>
						</tr>
						<tr style="height:40px;"><td></td></tr>
					</tbody>
				</table>
			</td>
		</tr>

		</tbody>
		</table>
		<!-- end section3 -->
