provider "digitalocean" {
  token = var.do_token
}

# Create Droplet
resource "digitalocean_droplet" "app" {
  name   = "lapinlearn-ssr"
  region = "sgp1"
  size   = "s-1vcpu-1gb"
  image  = "ubuntu-22-04-x64"

  ssh_keys = ["44:f0:35:66:4a:ca:bc:f5:2d:d5:90:ea:f8:6b:48:14"]

  user_data = file("cloud-init.yml") # Cloud-init script
}

# Output Droplet IP
output "droplet_ip" {
  value = digitalocean_droplet.app.ipv4_address
}
