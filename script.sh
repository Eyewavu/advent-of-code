for i in ./day-*/
do
  cd "$i"
  yarn init -y
  cd..
done