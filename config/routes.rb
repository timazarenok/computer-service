Rails.application.routes.draw do
  root 'pages#index'

  resources :service, only: %i[create index show update destroy]
  resources :applications, only: %i[create index update destroy]
  resources :application_services, only: %i[create index update destroy]
  resources :master, only: %i[create index show update destroy]
  resources :order, only: %i[create index show update destroy]
  
  post '/login',    to: 'sessions#create'
  post '/logout',   to: 'sessions#destroy'
  get '/logged_in', to: 'sessions#is_logged_in?'
  
  resources :users, only: [:create, :show, :index]
  
  get '*path', to: 'pages#index', via: :all
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
