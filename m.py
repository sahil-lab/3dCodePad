import trimesh

# Create a unit cube mesh (1×1×1)
cube = trimesh.creation.box(extents=(1, 1, 1))

# Export the mesh to GLB format
output_file = 'cube.glb'
cube.export(output_file)
print(f"Generated {output_file} successfully.")