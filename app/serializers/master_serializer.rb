class MasterSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :telephone
end
