from django.db import models


class ExamType(models.Model):
    name = models.CharField(max_length=128, unique=True,
                            help_text="e.g. Assignment, Cat")
    description = models.CharField(max_length=128, null=True,
                                   help_text="e.g. Opening: done after opening")
    is_trashed = models.BooleanField(default=False,
                                     help_text="turn true if deleted")

    def __str__(self):
        return self.name


