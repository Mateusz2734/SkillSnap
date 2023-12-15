from api import API


def test_unauthorized_user():
    api = API("http://localhost:4444")
    api.wait()

    # TEST EVERY ROUTE WITH 'GET' METHOD
    code, json = api.get("/health")
    assert code == 200
    assert json["status"] == "success"

    code, _ = api.get("/categories")
    assert code == 401

    code, _ = api.get("/skills")
    assert code == 401

    code, _ = api.get("/categories/programming")
    assert code == 401

    code, _ = api.get("/admin/reports")
    assert code == 401

    code, _ = api.get("/admin/users")
    assert code == 401

    code, _ = api.get("/admin/stats/general")
    assert code == 401

    code, _ = api.get("/admin/stats/users/1")
    assert code == 401

    # TEST EVERY ROUTE WITH 'DELETE' METHOD
    code, _ = api.delete("/users/1", {})
    assert code == 401

    # TEST EVERY ROUTE WITH 'POST' METHOD
    code, _ = api.post("/categories", {})
    assert code == 401

    code, _ = api.post("/skills", {})
    assert code == 401

    code, json = api.post("/auth/login", {"username": "a", "password": "user1234"})
    assert code == 401
    assert json["status"] == "failed"

    code, json = api.post("/auth/login", {"username": "user", "password": "user1234"})
    assert code == 200
    assert json["status"] == "success"

    code, json = api.post("/auth/login", {"username": "user", "password": "user4321"})
    assert code == 422
    assert json["status"] == "failed"
