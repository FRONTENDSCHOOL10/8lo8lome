import AppMeta from '@/components/AppMeta';
import SearchBar from '../SearchBar';
import FilterLink from '../FilterLink';
import { AppHeader } from '@/components';
import { AppNav } from '@/components';

export default function Map() {
  return (
    <>
      <AppMeta title="지도 페이지" description="지도 페이지입니다." />
      <AppHeader></AppHeader>

      <header className="flex items-center gap-1 m-4">
        <h1 className="sr-only">지도 페이지</h1>

        <SearchBar />
        <FilterLink />
      </header>

      {/* <div id="map" style="width:278px;height:320px;"></div>
      <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=cb9a08ba31d5d7a3133d4b75570df2de"></script>
      <script>
		var container = document.getElementById('map');
		var options = {
			center: new kakao.maps.LatLng(33.450701, 126.570667),
			level: 3
		};

		var map = new kakao.maps.Map(container, options);
	</script> */}

      <AppNav />
    </>
  );
}
