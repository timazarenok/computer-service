class ApplicationsController < ApplicationController
  protect_from_forgery with: :null_session
  
  def index
    applications = Application.all

    render json: ApplicationSerializer.new(applications, options).serialized_json
  end

  def show
    application = Application.find(params[:id])

    render json: ApplicationSerializer.new(application, options).serialized_json 
  end
  
  def create
    application = Application.new(application_params)
  
    if application.save
      render json: ApplicationSerializer.new(application, options).serialized_json
    else
      render json: { error: application.errors.messages }, status: 422
    end
  end

  def update
    application = Application.find(params[:id])

    if application.update(application_params)
      render json: ApplicationSerializer.new(application, options).serialized_json
    else
      render json: { error: application.errors.messages }, status: 422
    end
  end

  def destroy
    application = Application.find(params[:id])
  
    if application.destroy
      head :no_content
    else
      render json: { error: application.errors.messages }, status: 422
    end
  end

  private
  
  def options
    @options ||= { include: %i[service] }
  end

  def application_params
    params.require(:application).permit(:name, :description, :date, :phone, :firstname, :service_id)
  end
end
