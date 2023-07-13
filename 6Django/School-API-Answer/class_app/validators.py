from django.core.exceptions import ValidationError
import re

def validate_subject_format(value):
    if not value == value.title():
        raise ValidationError('Subject must be in title case format.')
    
def validate_professor_format(value):
    regex=r'^Professor\s[A-Z][a-z]+$'
    if not re.match(regex, value):
        raise ValidationError('Professor name must be in the format "Professor Adam".')