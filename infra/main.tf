# Create Droplet
resource "digitalocean_droplet" "app" {
  name   = "lapinlearn-ssr"
  region = "sgp1"
  size   = "s-1vcpu-1gb"
  image  = "ubuntu-22-04-x64"

  ipv6 = true

  ssh_keys = ["44:f0:35:66:4a:ca:bc:f5:2d:d5:90:ea:f8:6b:48:14", "b9:ae:10:6d:d6:8b:67:35:2a:39:e3:68:08:7d:bd:7b"]
}

# Output Droplet IP
output "droplet_ip" {
  value = digitalocean_droplet.app.ipv4_address
}
