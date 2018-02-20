from django.utils.translation import pgettext_lazy


class GenderChoices:
    MALE = 'male'
    FEMALE = 'female'
    OTHERS = 'others'

    CHOICES = [
        (MALE, pgettext_lazy('gender choice', 'Male')),
        (FEMALE, pgettext_lazy('gender choice', 'Female')),
        (OTHERS, pgettext_lazy('gender choice', 'Others')),
        ]


class ReligionChoices:
    CHRISTIAN = 'christian'
    MUSLIM = 'muslim'
    OTHERS = 'others'

    CHOICES = [
        (CHRISTIAN, pgettext_lazy('religion choice', 'christian')),
        (MUSLIM, pgettext_lazy('religion choice', 'muslim')),
        (OTHERS, pgettext_lazy('religion choice', 'others')),
]