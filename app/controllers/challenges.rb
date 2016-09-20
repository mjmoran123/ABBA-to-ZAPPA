require 'json'

get '/challenges' do 
	@challenges = Challenge.all
	erb :'challenges/index'
end

get '/challenges/:id' do 
	@challenge = Challenge.find(params[:id])
	data = {start_id: @challenge.start_id, start_name: @challenge.start_name, end_id: @challenge.end_id, end_name: @challenge.end_name}.to_json
	# data = [{id: @challenge.start_id, name: @challenge.start_name}, {id: @challenge.end_id, name: @challenge.end_name}].to_json
end

post '/challenges' do 
	# p params[:startArtist][:name]
	@challenge = Challenge.find_by(start_id: params[:startArtist][:id], end_id: params[:goalArtist][:id])
	if @challenge
		Game.create(player_id: current_user.id, challenge_id: @challenge.id, score: params[:chainLength])
	end

end