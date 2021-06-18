class OrderController < ApplicationController
  protect_from_forgery with: :null_session
  
  def index
    orders = Order.all

    render json: OrderSerializer.new(orders).serialized_json
  end

  def show
    order = Order.find(params[:id])

    render json: OrderSerializer.new(order).serialized_json 
  end
  
  def create
    order = Order.new(order_params)
  
    if order.save
      render json: OrderSerializer.new(order).serialized_json
    else
      render json: { error: order.errors.messages }, status: 422
    end
  end

  def update
    order = Order.find(params[:id])

    if order.update(order_params)
      render json: OrderSerializer.new(order).serialized_json
    else
      render json: { error: order.errors.messages }, status: 422
    end
  end

  def destroy
    order = Order.find(params[:id])
  
    if order.destroy
      head :no_content
    else
      render json: { error: order.errors.messages }, status: 422
    end
  end

  private

  def order_params
    params.require(:order).permit(:price, :days, :master_id, :application_id)
  end
end
