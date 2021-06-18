class ApplicationSerializer
  include FastJsonapi::ObjectSerializer
  
  attributes :id, :name, :description, :firstname, :phone, :date, :status, :user_id
  has_many :services 
end
