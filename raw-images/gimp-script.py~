
# run this inside the gimp console
import gimpfu
import os

def convert(filename, dirname, exportname):
	img = pdb.gimp_file_load(dirname + '/'+ filename, filename)
	new_name = filename.rsplit(".",1)[0] + ".png"
	layer = pdb.gimp_image_merge_visible_layers(img, gimpfu.CLIP_TO_IMAGE)
	pdb.gimp_file_save(img,layer, exportdir+'/'+new_name, new_name)
	pdb.gimp_image_delete(img)



#==========================================
from glob import glob


os.chdir('/home/thomas/pro/ng/wubi/raw-images/xcf/')
xcffolder = os.getcwd() +'/'
export = xcffolder+'export/'
# hier gibt es unter ordner
os.mkdir(export)
for dir in os.listdir('.'):
	os.mkdir(export + dir)
	print(dir)
	dirname = xcffolder + dir
	exportdir = export + dir
	print (dirname)
	print(exportdir)
	os.chdir(dirname)
	for x in [f for f in glob("*.xcf")]:
		convert(x, dirname, exportdir)
		print(x)


