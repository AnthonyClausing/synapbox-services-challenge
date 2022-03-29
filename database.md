# 5. Data Persistence
For this example, I will write out my general ideas of implementing the database transactions of these four routes in Ruby on Rails, this is mostly detailed pseudo-code 

## Create the migration
```
class CreateNodes < ActiveRecord::Migration
  def change
    create_table nodes do |t|
      t.string  :label
      t.timestamps
    end
   end
 end
```
## Create a model
```
#/models/node.rb
class Node < ApplicationRecord
  belongs_to :node, foreign_key: 'parent_id'
  has_many :node
  validates :label, presence: true
  before_destroy do
    if self.nodes? #if a node has children cancel the deletion
      throw(:abort)
    end
  end
end
```
## Define the routes
```
#/config/routes.rb
scope "/api" do
 resource :tree, controller: 'node'
end
```

## Implement Logic in Controller
```
#/controllers/node_controller.rb
#assume treeBuilder.js function is rewritten in ruby as build_tree

class NodeController < ApplicationController

    def index
      @nodes = Node.all
      @tree = build_tree(@nodes)
      # respond with @tree
    end

    def create
      begin
        Node.create!(label: params[:label], parent_id: params[:parent])
      rescue
        #custom error handling
      end
    end

    def destroy
      begin
        Node.destroy!(params[:id])
      rescue
        #custom error handling
      end
    end

    def update
      begin 
        @node = Node.find(params[:id])
        @node.update!(parent_id: params[:current-id])
      rescue
        #custom error handling
      end
    end
end
```