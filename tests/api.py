import sys
import time
import requests
import pytest
from requests.exceptions import ConnectionError


class API:
    def __init__(self, url):
        self.url = url
        self.token = None
        self.headers = {
            "Content-Type": "application/json",
        }

    def wait(self, interval=1, timeout=10):
        start_time = time.time()

        while True:
            if self.get("/health")[0] == 200:
                return True

            if time.time() - start_time > timeout:
                print("Timeout reached. Operation did not complete.")
                return False

            time.sleep(interval)

    def login(self, username, password):
        user = {"username": username, "password": password}

        try:
            response = requests.post(self.url + "/auth/login", json=user)
            self.token = response.json()["authenticationToken"]
            self.headers["Authorization"] = f"Bearer {self.token}"
        except ConnectionError:
            pytest.fail("Cannot connect to server")

    def get(self, route):
        try:
            headers = {}
            if self.token:
                headers = self.headers

            response = requests.get(self.url + route, headers=headers)

            return response.status_code, response.json()
        except ConnectionError:
            pytest.fail("Cannot connect to server")

    def post(self, route, data):
        try:
            headers = {}
            if self.token:
                headers = self.headers

            response = requests.post(self.url + route, json=data, headers=headers)

            return response.status_code, response.json()
        except ConnectionError:
            pytest.fail("Cannot connect to server")

    def delete(self, route, data):
        try:
            headers = {}
            if self.token:
                headers = self.headers

            response = requests.delete(self.url + route, json=data, headers=headers)

            return response.status_code, response.json()
        except ConnectionError:
            pytest.fail("Cannot connect to server")
