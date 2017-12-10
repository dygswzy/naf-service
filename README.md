
# naf common service
multi-tenancy applicaiton platform

## api test

### for global tenancy
curl -v -d "tagname=tag1" -H "Accept: application/json" http://localhost:7001/tag/create
curl -v -d "name=seq1" -H "Accept: application/json" http://localhost:7001/seq/nextval
### for test tenancy
curl -v -d "tagname=tag1" -H "Accept: application/json" -H "x-tenant: test" http://localhost:7001/tag/create
curl -v -d "name=seq1" -H "Accept: application/json" -H "x-tenant: test" http://localhost:7001/seq/nextval

/* comment by dygswzy */
