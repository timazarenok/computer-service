class ApplicationSerializer
  include FastJsonapi::ObjectSerializer
  
  attributes :id, :name, :description, :firstname, :phone, :date, :status
  has_many :services 
end
