def logged_in?
  session[:user_id] != nil
end

def current_user
  @_cached_user ||= User.find(session[:user_id]) if logged_in?
end

def redirect_unless_logged_in(redirect_path)
  if !logged_in?
    redirect redirect_path
  end
end

def current_path
  request.path_info
end