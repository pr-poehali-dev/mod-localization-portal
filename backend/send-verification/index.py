"""
Business: Send verification code via email for user registration
Args: event with httpMethod, body containing email address
Returns: HTTP response with success status
"""

import json
import smtplib
import random
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Dict, Any

def generate_code() -> str:
    """Generate 6-digit verification code"""
    return str(random.randint(100000, 999999))

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    body_str = event.get('body', '{}')
    if not body_str or body_str.strip() == '':
        body_str = '{}'
    
    try:
        body_data = json.loads(body_str)
    except json.JSONDecodeError:
        body_data = {}
    
    email = body_data.get('email', '')
    
    if not email:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Email is required'})
        }
    
    verification_code = generate_code()
    
    smtp_host = os.environ.get('SMTP_HOST')
    smtp_port = int(os.environ.get('SMTP_PORT', '587'))
    smtp_user = os.environ.get('SMTP_USER')
    smtp_password = os.environ.get('SMTP_PASSWORD')
    
    message = MIMEMultipart('alternative')
    message['Subject'] = 'Код подтверждения ruprojectgames'
    message['From'] = smtp_user
    message['To'] = email
    
    text_content = f'''
Добро пожаловать на ruprojectgames!

Ваш код подтверждения: {verification_code}

Введите этот код для завершения регистрации.

Если вы не регистрировались на нашем сайте, проигнорируйте это письмо.
    '''
    
    html_content = f'''
    <html>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); padding: 30px; border-radius: 10px; text-align: center;">
                <h1 style="color: white; margin: 0;">ruprojectgames</h1>
                <p style="color: white; margin-top: 10px;">Русификация модов для RPG</p>
            </div>
            <div style="padding: 30px; background: #f9fafb; border-radius: 10px; margin-top: 20px;">
                <h2 style="color: #1f2937;">Подтверждение регистрации</h2>
                <p style="color: #4b5563; font-size: 16px;">Добро пожаловать! Используйте код ниже для завершения регистрации:</p>
                <div style="background: white; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
                    <h1 style="color: #dc2626; font-size: 36px; letter-spacing: 8px; margin: 0;">{verification_code}</h1>
                </div>
                <p style="color: #6b7280; font-size: 14px;">Если вы не регистрировались на нашем сайте, проигнорируйте это письмо.</p>
            </div>
        </body>
    </html>
    '''
    
    part1 = MIMEText(text_content, 'plain')
    part2 = MIMEText(html_content, 'html')
    message.attach(part1)
    message.attach(part2)
    
    try:
        server = smtplib.SMTP(smtp_host, smtp_port)
        server.starttls()
        server.login(smtp_user, smtp_password)
        server.send_message(message)
        server.quit()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': True,
                'code': verification_code,
                'message': 'Verification code sent'
            })
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': False,
                'error': str(e)
            })
        }