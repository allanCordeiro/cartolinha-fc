from django.contrib import admin
from .models import Player, Team, MyTeam, Match, Action
# Register your models here.
class ActionInLine(admin.TabularInline):
    model = Action

class MatchAdmin(admin.ModelAdmin):
    inlines = [ActionInLine]


admin.site.register(Player)
admin.site.register(Team)
admin.site.register(MyTeam)
admin.site.register(Match, MatchAdmin)
admin.site.register(Action)
