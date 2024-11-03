class DevelopmentConfig:
    DEBUG = True
    MYSQL_HOST = 'localhost'
    MYSQL_USER = 'root'
    MYSQL_PASSWORD = ''
    MYSQL_DB = 'api_utl'
    ssl={'disabled': True}  # Deshabilita SSL si no es necesario en tu entorno


config = {
    'development': DevelopmentConfig
}
