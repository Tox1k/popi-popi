#!/bin/sh
docker network create -d bridge popi -o "com.docker.network.bridge.name"="popi" -o "com.docker.network.bridge.enable_ip_masquerade"="true" -o "com.docker.network.bridge.enable_icc"="true" -o "com.docker.network.bridge.host_binding_ipv4"="0.0.0.0" -o "com.docker.network.driver.mtu"="1500"
