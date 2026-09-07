"""Concatenate regional fill waves into one TSV blob."""
from naciones_fill_am import AM
from naciones_fill_eu import EU
from naciones_fill_as import AS
from naciones_fill_af import AF
from naciones_fill_plus import PLUS

FILL = "\n".join(x.strip("\n") for x in (AM, EU, AS, AF, PLUS))
