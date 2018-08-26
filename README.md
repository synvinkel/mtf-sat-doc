
# MTF Satellite data API

This documentation describes how to use the satellite data API designed for MTF.

TODO: describe the data source

# API

The API is available at `https://mtf-sat.synvinkel.org/timeseries/`.

## Response

Using either of the endpoints and options described below will return a JSON like this:

```
{
    location: {"lng": 0, "lat": 0},
    images: [
        {
            bands: {
                    B1: 3645,
                    B2: 4324,
                    etc...
                },
            cloudcover: 30.8,
            date: "2018-06-05",
            url: "https://---imageurl---",
        },
        ...etc
    ]
}
```

Requests that fail for one reason or another will respond with an appropriate HTTP error code, and a hopefully helpful error message.

## API-key

All of the `/timeseries` request must include an `apikey` query parameter. 

Example:
```
/timeseries?lng=106.18&lat=53.98&apikey={Your API-key here}
```

## By coordinates

A timeseries for a specific location can be requested by adding the `lng` and `lat` query parameters:

```
https://mtf-sat.synvinkel.org/timeseries?lng=106.18&lat=53.98
```

## By placename

Requesting by placename can be done with `/timeseries/{name}`

```
https://mtf-sat.synvinkel.org/timeseries/{name}
```

## Options

Options can be appended to the endpoints described above to narrow down the result. This is a great way to make your request process faster.

### maxCloudCover

Use `maxCloudCover` to filter by cloud cover percentage. Must be a number between 0 and 100.

```
https://mtf-sat.synvinkel.org/timeseries/{name}?maxCloudCover=50
```

### fromDate, startDate

Filtering by a specific date range is done by providing `startDate` and `endDate` in YYYY-MM-DD format (e.g. 2018-01-31) 

```
https://mtf-sat.synvinkel.org/timeseries/{name}?startDate=2018-06-01&endDate=2018-07-23
```

### buffer

Use `buffer` to set a custom buffer around the requested point. The default buffer is 2000 meters. Buffer size greatly affects the processing time for both the timeseries and the images you get.

Setting the buffer to 0 will get the time series for the pixel at that location. The image url will be omitted from the result.

### season

To only include images taken during a certain season you can provide `spring`,`summer`,`fall` or `winter` for the `season` query parameter. Season is defined in a very much northen-hemispherocentric manner.

```
https://mtf-sat.synvinkel.org/timeseries/{name}?season=winter
```

# Images

The url provided in the timeseries result will process and return the requested image as a png. 

## Options

By default the image will be visualized as RGB truecolor. If you want to you can choose arbitrary band combinations by providing a comma separated string of bands as a `bands` parameter.

Some suggested band combinations to try out:

* **Natural Colors:** B4,B3,B2
* **False color Infrared:** B8,B4,B3
* **False color Urban:** B12,B11,B4
* **Agriculture:** B11,B8,B2
* **Atmospheric penetration:** B12,B11,B8a
* **Healthy vegetation:** B8,B11,B2
* **Land/Water:** B8,B11,B4
* **Natural Colors with Atmospheric Removal:** B12,B8,B3
* **Shortwave Infrared:** B12,B8,B4
* **Vegetation Analysis:** B11,B8,B4

```
https://mtf-sat.synvinkel.org/image/18.30005/57.63845/20180421T100029_20180421T100427_T33VXD-7d0.png
```
![rgb visualization](images/20180421T100029_20180421T100427_T33VXD-7d0.png)
```
https://mtf-sat.synvinkel.org/image/18.30005/57.63845/20180421T100029_20180421T100427_T33VXD-7d0.png?bands=B8,B4,B3
```
![false color visualization](images/20180421T100029_20180421T100427_T33VXD-7d0_falsecolor.png)


