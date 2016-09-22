enable :sessions


get '/players/new' do
	erb :'players/new'
end

get '/players/:id' do 
	if logged_in? && params[:id] == current_user.id.to_s
		# @challenges = current_user.challenges
		@games = current_user.games.order(:challenge_id)
	erb :'players/show'
	else
		erb :'404'
	end
end

post '/players' do
	new_player = Player.new(username: params[:username], email: params[:email])
	new_player.password = params[:password]
	
	if new_player.save
		session[:player_id] = new_player.id
		#redirect "/players/#{current_user.id}"
		@challenges = Challenge.all
		erb :index
	else
		@errors = new_player.errors.full_messages
		erb :'players/new'
	end

end

get '/login' do 
	erb :'players/login'
end

post '/login' do 
	@player = Player.authenticate(params[:username], params[:password])
	if @player 
		session[:player_id] = @player.id
		#redirect "/players/#{current_user.id}"
		@challenges = Challenge.all
		erb :index
	else
		@errors = ["Something went wrong with your username or password. Try logging in again."]
		erb :'players/login'
	end
end

post '/logout' do 
	session[:player_id] = nil
	erb :index
end