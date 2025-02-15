from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('homepage.html')

@app.route('/analysis')
def analysis():
    return render_template('analysis.html')

@app.route('/npv')
def npv():
    return render_template('npv.html')

@app.route('/tmv')
def tmv():
    return render_template('tmv.html')




if __name__ == '__main__':
    app.run(debug=True)