
import click
from api.models import db, User

def setup_commands(app):
    

    @app.cli.command("insert-test-users")
    @click.argument("count")
    def insert_test_users(count):
        
        for x in range(1, int(count) + 1):
            user = User(
                email=f"test_user{x}@test.com",
                password="123456",
                is_active=True
            )
            db.session.add(user)
            db.session.commit()
            print(f"Usuario creado: {user.email}")

        print("Todos los usuarios de prueba han sido creados.")

    @app.cli.command("insert-test-data")
    def insert_test_data():
        """
        Este comando no realiza ninguna operación específica.
        """
        pass
