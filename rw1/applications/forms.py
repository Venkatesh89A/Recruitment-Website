from django import forms

from .models import Application


class ApplicationForm(forms.ModelForm):
    """Form used by an applicant to apply for a job."""

    class Meta:
        model = Application
        fields = ["resume", "cover_letter_file", "cover_letter_text"]
        widgets = {
            "cover_letter_text": forms.Textarea(
                attrs={"rows": 6, "placeholder": "Write a cover letter (optional if uploading a file)..."}
            ),
        }

    def clean(self):
        cleaned_data = super().clean()
        cover_letter_file = cleaned_data.get("cover_letter_file")
        cover_letter_text = cleaned_data.get("cover_letter_text")
        if not cover_letter_file and not cover_letter_text:
            raise forms.ValidationError(
                "Please provide a cover letter — either upload a file or type one in."
            )
        return cleaned_data


class ApplicationStatusUpdateForm(forms.ModelForm):
    """Form used by recruiters/admins to update an application's status."""

    note = forms.CharField(
        required=False,
        widget=forms.TextInput(attrs={"placeholder": "Optional note (e.g. reason, feedback)"}),
    )

    class Meta:
        model = Application
        fields = ["status"]
