class ApplicationServicesController < ApplicationController
  protect_from_forgery with: :null_session
  
  def index
    application_service = ApplicationService.all

    render json: ApplicationServiceSerializer.new(application_service).serialized_json
  end

  def show
    application_service = ApplicationService.find(params[:id])

    render json: ApplicationServiceSerializer.new(application_service).serialized_json 
  end
  
  def create
    application_service = ApplicationService.new(application_service_params)

    if application_service.save
      render json: ApplicationServiceSerializer.new(application_service).serialized_json
    else
      render json: { error: application_service.errors.messages }, status: 422
    end
  end

  def update
    application_service = ApplicationService.find(params[:id])

    if application_service.update(application_params)
      render json: ApplicationServiceSerializer.new(application_service).serialized_json
    else
      render json: { error: application_service.errors.messages }, status: 422
    end
  end

  def destroy
    application_service = ApplicationService.find(params[:id])
  
    if application_service.destroy
      head :no_content
    else
      render json: { error: application_service.errors.messages }, status: 422
    end
  end

  private

  def application_service_params
    params.require(:application_service).permit(:service_id, :application_id)
  end
end
