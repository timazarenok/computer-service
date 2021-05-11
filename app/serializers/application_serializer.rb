class ApplicationSerializer
  include FastJsonapi::ObjectSerializer
  
  attributes :id, :name, :description, :firstname, :phone, :date
  belongs_to :service 
end
