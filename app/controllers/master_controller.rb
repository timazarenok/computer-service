class MasterController < ApplicationController
  protect_from_forgery with: :null_session
  
  def index
    masters = Master.all

    render json: MasterSerializer.new(masters).serialized_json
  end

  def show
    master = Master.find(params[:id])

    render json: MasterSerializer.new(master).serialized_json 
  end
  
  def create
    master = Master.new(master_params)
  
    if master.save
      render json: MasterSerializer.new(master).serialized_json
    else
      render json: { error: master.errors.messages }, status: 422
    end
  end

  def update
    master = Master.find(params[:id])

    if master.update(master_params)
      render json: MasterSerializer.new(master).serialized_json
    else
      render json: { error: master.errors.messages }, status: 422
    end
  end

  def destroy
    master = Master.find(params[:id])
  
    if master.destroy
      head :no_content
    else
      render json: { error: master.errors.messages }, status: 422
    end
  end

  private

  def master_params
    params.require(:master).permit(:name, :telephone)
  end
end
