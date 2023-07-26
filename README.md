# iimmgg

Ce projet utilise [11ty](https://www.11ty.dev/) — et notamment [la pagination](https://www.11ty.dev/docs/pages-from-data/), [les filtres](https://www.11ty.dev/docs/filters/), et [les permaliens](https://www.11ty.dev/docs/permalinks/) — pour générer des SVG à partir d’un objet json en entrée.


### Données

Les fichiers json d’entrée sont stockés dans `_site/_data/`.

### Nettoyer un json d’entrée

En utilisant [jq](https://jqlang.github.io/jq/), on peut générer un fichier json sur-mesure contenant uniquement les clés qui nous intéressent — par exemple, pour un export du programme de Paris Web, voilà la commande utilisée :

```shell
cat _site/_data/pw-2023-export.json | jq 'map({title,date,start,speakers})' > _site/_data/pw-2023.json
```
