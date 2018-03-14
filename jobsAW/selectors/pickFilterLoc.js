import bug from '../../_libs/bug';


export default (language, data) => {
                                                                // bug('pickFilterLoc', language, data.locCommon)
    const loc = data.locCommon.get(language);
                                                                // bug('loc', loc)
                                                                // bug('loc.filter', loc.get('filter'))
    return {
        filter: loc.get('filter'),
        city: loc.get('city'),
        comp: loc.get('company'),
        job: loc.get('job'),
    };
};