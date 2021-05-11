class ServiceSerializer
  include FastJsonapi::ObjectSerializer
  
  attributes :id, :name, :description, :price
end
