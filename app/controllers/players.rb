enable :sessions


get '/users/new' do
	if request.xhr?
		erb :'users/new', layout: false
	else
		erb :"users/new"
	end
end

get '/users/:id' do 
	if logged_in? && params[:id] == current_user.id.to_s
	erb :'users/profile'
	else
		erb :'404'
	end
end

post '/users' do
new_user = User.new(username: params[:username])
	new_user.password = params[:password]
	if request.xhr?
		if new_user.save
			session[:user_id] = new_user.id
			erb :'users/profile', layout: false
		else
			@errors = new_user.errors.full_messages
			erb :'users/new', layout: false
		end
	else
		if new_user.save
			session[:user_id] = new_user.id
			redirect "/users/#{current_user.id}"
		else
			@errors = new_user.errors.full_messages
			erb :'users/new'
		end
	end
end

get '/login' do 
	erb :'users/login'
end

post '/login' do 
	@user = User.authenticate(params[:username], params[:password])
	if @user 
		session[:user_id] = @user.id
		redirect "/users/#{current_user.id}"
	else
		@errors = ["Something went wrong with your username or password. Try logging in again."]
		erb :'users/login'
	end
end