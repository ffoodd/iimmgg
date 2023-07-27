# iimmgg

Ce projet utilise [11ty](https://www.11ty.dev/) — et notamment [la pagination](https://www.11ty.dev/docs/pages-from-data/), [les filtres](https://www.11ty.dev/docs/filters/), et [les permaliens](https://www.11ty.dev/docs/permalinks/) — pour générer des SVG à partir d’un objet json en entrée.


## Données

Les fichiers json d’entrée sont stockés dans `_site/_data/`.

### Nettoyer un json d’entrée

En utilisant [jq](https://jqlang.github.io/jq/), on peut générer un fichier json sur-mesure contenant uniquement les clés qui nous intéressent — par exemple, pour un export du programme de Paris Web, voilà la commande utilisée :

```shell
cat _site/_data/pw-2023-export.json | jq 'map({title,date,start,speakers,type})' > _site/_data/pw-2023.json
```

## Images

Les images sont générées en SVG avec un peu d’aide d’Eleventy et [Nunjucks](https://mozilla.github.io/nunjucks/), puis sont converties en png avec Firefox (lancé en CLI via un script Node) :

```shell
firefox -p "noob" --screenshot path/to/img.png --window-size 1920,1080 http://localhost:8080/pw-2023/svg/img.svg
```

Plusieurs écueils :
1. Il faut disposer de Firefox ;
2. Il faut lancer un serveur web : la commande ne veut pas fonctionner avec `file://` ;
3. Et c’est quand même assez lent.

### À étudier en remplacement

J’ai déjà voulu jouer avec :

- Sharp : ne gère pas les fontes embarquées,
- Puppeteer : impossible de le lancer sur mon poste.

D’autres solutions existent — mais qui ne seront pas _cross-platform_.

#### rsvg-convert

```shell
sudo apt install librsvg2-bin
rsvg-convert -w 1920 -h 1080 docs/pw-2023/svg/aria-the-good-parts.svg -o docs/pw-2023/png/aria-the-good-parts.png
```

#### ImageMagick

```shell
sudo apt install imagemagick
convert -size 1920x1080 docs/pw-2023/svg/aria-the-good-parts.svg docs/pw-2023/png/aria-the-good-parts.png
```

#### Inkscape

Semble ne pas gérer `<use>` et `<image>`.

```shell
inkscape docs/pw-2023/svg/aria-the-good-parts.svg --export-type png -h 1080 -w 1920
```
