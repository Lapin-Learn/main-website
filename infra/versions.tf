terraform {
  required_version = ">= 1.6.3"

  backend "s3" {}

  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "~> 2.0"
    }
  }
}
