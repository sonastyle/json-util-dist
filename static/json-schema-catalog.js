hostname=window.location.hostname;pageIdentifier=`${hostname}-pdcfls`;let filteredCatalog=[],schemaCatalog={},combinedSchemaCatalog={schemas:[]};const favSchemasLocalData=localStorage.getItem(`${pageIdentifier}-favSchemas`);let favSchemas=favSchemasLocalData?JSON.parse(favSchemasLocalData):[];const userDefSchemasLocalData=localStorage.getItem(`${pageIdentifier}-userDefSchemas`);
let userDefSchemas=favSchemasLocalData?JSON.parse(userDefSchemasLocalData):[],extractFilenameFromUrl=a=>{try{return(new URL(a)).pathname.split("/").pop()}catch{return""}},updateCatalog=a=>{try{if(a.hasOwnProperty("schemas")){let c=a.schemas;totalVisibleSchemaItems=c.length;$("#allSchemaCount").html(c.length);$("#favSchemaCount").html(favSchemas.length);$("#udSchemaCount").html(userDefSchemas.length);$("#schemaCatalog").html("");$("#schemaFavorite").html("");$("#schemaUserdefined").html("");c.forEach((b,
d)=>{if(b){let e="Unknown schema";b.hasOwnProperty("name")&&(e=b.name);let k="",l="";b.hasOwnProperty("url")&&(k=b.url);k.length>1&&(l=`<tr><td class="text-white-50">URL</td><td class="text-white-50"><a href="${k}"  target="_blank" class="icon-link icon-link-hover">${extractFilenameFromUrl(k)}</a></td></tr>`);let m="";b.hasOwnProperty("fileMatch")&&(m=`<tr><td class="text-white-50">File Match</td><td class="text-white-50">${`<ul class="list-unstyled">${b.fileMatch.map(g=>`<li>${g}</li>`).join("")}</ul>`}</td></tr>`);
var h="";b.hasOwnProperty("versions")&&(h=`<table class="table table-dark table-striped table-hover">
                                <caption class="caption-top text-white-50">Versions</caption>
                                <tbody>
                                    ${Object.keys(b.versions).map(g=>`<tr><td class="text-white-50">${g}</td><td><a href="${b.versions[g]}" target="_blank" class="icon-link icon-link-hover">${extractFilenameFromUrl(b.versions[g])}</a></td></tr>`).join("")}
                                </tbody>
                                </table>`);let n="";b.hasOwnProperty("description")&&(n=b.description);let p="text-dark";var f=!1;favSchemas.includes(e)&&(f=!0,p="text-warning");let q=!1,r="",t="";userDefSchemas.forEach(g=>{g.name==e&&(q=!0,r=`<button class="btn btn-sm btn-secondary me-0" title="Remove schema" type="button" onclick="removeUserDefSchema({'name':'${e}'})">
                                            <i class="fas fa-minus-circle text-danger-emphasis"></i>
                                        </button>`,t='<span title="Userdefined schema"><i class="fas fa-user-edit fa-xs text-secondary"></i></span>')});d=`
                <div class="card bg-dark border-secondary text-white">
                    <div class="card-header d-flex justify-content-between align-items-center">
                            <! -- Name and Description -->
                            <div class="flex-grow-1" style="flex-basis: 60%;">
                                <div class="card-title mb-1">${d+1} - ${e} ${t}</div>
                                <small class="card-subtitle text-white-50">${n}</small>
                            </div>
                        
                            <!-- Toggle button with Font Awesome icon -->
                        
                            <!-- Add button -->
                            <div class="d-flex flex-wrap justify-content-end gap-1" style="flex-basis: 40%; max-width: 40%;">
                                <button class="btn btn-sm btn-secondary me-0" type="button" onclick="schemaCatSetFav({'btn':this,'name':'${e}', 'url': '${k}'})" title="Add / Remove to favorites">
                                <i class="fas fa-star ${p}"></i>
                                </button>
                                <button class="btn btn-sm btn-secondary me-0"  type="button" onclick="schemaCatDetails('schemaDetailsId')" title="Show details">
                                <i class="fas fa-info-circle"></i>
                                </button>
                                ${r}
                                <button class="btn btn-sm btn-success" type="button" onclick="addSchemaCat2ResEditor({'name':'${e}', 'url': '${k}'})" title="Add schema to GREEN editor">
                                <i class="fas fa-plus"></i>
                                </button>
                            </div>
                    </div>

                    <div id="schemaDetailsId" class="collapse">
                        <div class="card-body">
                        <table class="table table-dark table-striped table-hover">
                                <tbody>
                                    ${l}
                                    ${m}
                                    ${h}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                `;h=`cat-allId-${Math.floor(Math.random()*1E9)}`;$("#schemaCatalog").append(d.replace(/schemaDetailsId/g,h));f&&(f=`cat-favId-${Math.floor(Math.random()*1E9)}`,$("#schemaFavorite").append(d.replace(/schemaDetailsId/g,f)));q&&(f=`cat-udsId-${Math.floor(Math.random()*1E9)}`,$("#schemaUserdefined").append(d.replace(/schemaDetailsId/g,f)))}})}}catch(c){console.error(`Error updating JSON catalog. Error: ${c}`)}},schemaCatDetails=a=>{$(`#${a}`).hasClass("collapse")?($(`#${a}`).removeClass("collapse"),
$(`#${a}`).addClass("expand")):($(`#${a}`).addClass("collapse"),$(`#${a}`).removeClass("expand"))},schemaCatSetFav=a=>{let c=a.name,b=!1;a=$(a.btn).children("i");$(a).hasClass("text-dark")?($(a).removeClass("text-dark"),$(a).addClass("text-warning"),favSchemas.includes(c)||(favSchemas.push(c),searchSchema(),b=!0)):($(a).addClass("text-dark"),$(a).removeClass("text-warning"),favSchemas.includes(c)&&(favSchemas.splice(favSchemas.indexOf(c),1),searchSchema(),b=!0),console.log(favSchemas));b&&localStorage.setItem(`${pageIdentifier}-favSchemas`,
JSON.stringify(favSchemas))},removeUserDefSchema=a=>{a=a.name;if(window.confirm(`Are you sure to delete the ${a} schema ?`))for(let c=0;c<userDefSchemas.length;c++)if(a==userDefSchemas[c].name){userDefSchemas.splice(c,1);mergeAllSchemaCatalogsNUpdate();searchSchema();localStorage.setItem(`${pageIdentifier}-userDefSchemas`,JSON.stringify(userDefSchemas));break}};
function isValidJsonSchema(a){if(typeof a!=="object"&&typeof a!=="boolean")return!1;if(typeof a==="boolean")return!0;if(a===null||"$schema"in a&&typeof a.$schema!=="string")return!1;if("type"in a){const b="string number integer boolean object array null".split(" ");var c=a.type;if(typeof c==="string"){if(!b.includes(c))return!1}else if(Array.isArray(c)){if(!c.every(d=>typeof d==="string"&&b.includes(d)))return!1}else return!1}if("properties"in a){if(typeof a.properties!=="object"||a.properties===
null)return!1;for(const b in a.properties)if(!isValidJsonSchema(a.properties[b]))return!1}if("items"in a)if(c=a.items,Array.isArray(c))for(const b of c){if(!isValidJsonSchema(b))return!1}else if(typeof c==="object"&&c!==null){if(!isValidJsonSchema(c))return!1}else return!1;return"required"in a&&(!Array.isArray(a.required)||!a.required.every(b=>typeof b==="string"))||"enum"in a&&!Array.isArray(a.enum)||"minimum"in a&&typeof a.minimum!=="number"||"maximum"in a&&typeof a.maximum!=="number"||"minLength"in
a&&typeof a.minLength!=="number"||"maxLength"in a&&typeof a.maxLength!=="number"||"pattern"in a&&typeof a.pattern!=="string"||"minItems"in a&&typeof a.minItems!=="number"||"maxItems"in a&&typeof a.maxItems!=="number"?!1:!0}
let addUserDefSchema=a=>{if(!a.hasOwnProperty("name"))return alert("Schema must have a name!"),!1;let c=a.name;if(!/^[A-Za-z0-9_-]+$/.test(c))return alert("Invalid schema name! Name with letters, numbers, underscore, hyphen are acceptable. Blank space or special character not permitted"),!1;if(!isValidJsonSchema(a))return alert("Invalid JSON schema"),!1;let b=!1;for(let d=0;d<combinedSchemaCatalog.schemas.length;d++)if(combinedSchemaCatalog.schemas[d].name==c){alert(`Schema with name: ${c} is already exist, please assign a different name.`);
b=!0;break}if(b)return!1;userDefSchemas.push(a);mergeAllSchemaCatalogsNUpdate();searchSchema();localStorage.setItem(`${pageIdentifier}-userDefSchemas`,JSON.stringify(userDefSchemas));return!0};
$("#udSchemaSave").on("click",a=>{a.preventDefault();var c=$("#udSchemaName").val();let b=$("#udSchemaDesc").val(),d=$("#udSchemaUrl").val(),h=$("#udSchemaFileMatch").val();a=$("#udSchemaVerKey").val();let f=$("#udSchemaVerVal").val();if(d.length>1&&extractFilenameFromUrl(d).length<1)alert("Invalid url! Url must contain file name at the end.");else if(f.length>1&&extractFilenameFromUrl(f).length<1)alert("Invalid version! This should be a URL and must contain file name at the end.");else{var e={$schema:"https://json-schema.org/draft/2020-12/schema",
name:"Generated Schema",type:"object",properties:{name:{type:"string"}},required:["name"]};e.name=c;b.length>0&&(e.description=b);d.length&&(e.url=d);h.length>0&&(e.fileMatch=[h]);a.length>0&&f.length>0&&(c={},c[a]=f,e.versions=c);addUserDefSchema(e)&&bootstrap.Modal.getOrCreateInstance($("#udSchemaAddModal")[0]).hide()}});
async function loadJsonIntoEditor(a,c){try{const b=await fetch(a,{method:"GET",mode:"cors",headers:{Accept:"application/json"}});if(!b.ok)throw Error(`HTTP ${b.status}`);const d=await b.json();c.set(d)}catch(b){console.error("Failed to load JSON:",b),(res=confirm(`Unable to load JSON due to following issue.\n\nError: ${b} \n\nWould you like to open the URL in a new tab?`))&&window.open(a,"_blank")}}
let addSchemaCat2ResEditor=async a=>{let c=a.name,b=!1;for(let d=0;d<userDefSchemas.length;d++)if(schema=userDefSchemas[d],schema.name==c){resultEditor.set(schema);b=!0;break}b||loadJsonIntoEditor(a.url,resultEditor)},searchSchema=()=>{filteredCatalog.length=0;let a=$("#searchSchemaInput").val(),c=combinedSchemaCatalog.schemas;for(let b=0;b<c.length;b++){let d=c[b];d.name.toLowerCase().includes(a.toLowerCase())&&filteredCatalog.push(d)}updateCatalog({schemas:filteredCatalog})};
$("#searchSchemaBtn").on("click",()=>{searchSchema()});$("#searchSchemaInput").on("input",()=>{$("#searchSchemaInput").val().length<1?updateCatalog(combinedSchemaCatalog):searchSchema()});$("#removeAllFavotieSchems").on("click",()=>{window.confirm("Are you sure to remove all favorite schemas ?")&&(favSchemas=[],localStorage.setItem(`${pageIdentifier}-favSchemas`,JSON.stringify(favSchemas)),searchSchema())});
let mergeAllSchemaCatalogsNUpdate=()=>{schemaCatalog!=null&&schemaCatalog!=void 0&&schemaCatalog||(schemaCatalog={schemas:[]});userDefSchemas!=null&&userDefSchemas!=void 0&&userDefSchemas||(userDefSchemas=[]);combinedSchemaCatalog.schemas=[...schemaCatalog.schemas,...userDefSchemas];updateCatalog(combinedSchemaCatalog)},getSchemaCatalog=()=>{fetch("https://www.schemastore.org/api/json/catalog.json").then(a=>a.json()).then(a=>{schemaCatalog=a;mergeAllSchemaCatalogsNUpdate()}).catch(a=>console.error(a))};
$(document).ready(function(){getSchemaCatalog()});
