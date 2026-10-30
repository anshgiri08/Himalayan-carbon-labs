from flask import Flask
from flask_cors import CORS
from routes.health import health_bp
from routes.pilot_areas import pilot_bp
from routes.carbon import carbon_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(health_bp, url_prefix='/api')
app.register_blueprint(pilot_bp, url_prefix='/api')
app.register_blueprint(carbon_bp, url_prefix='/api')

if __name__ == '__main__':
    app.run(debug=True, port=5000)